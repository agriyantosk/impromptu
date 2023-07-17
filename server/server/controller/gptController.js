const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const axios = require("axios");

class GPTController {
  static async flights(req, res) {
    const origin = {
      method: "GET",
      url: "https://skyscanner44.p.rapidapi.com/autocomplete",
      params: { query: req.body.origin },
      headers: {
        "X-RapidAPI-Key": "f9d151f0edmsh5c990cda3c5851bp105b5fjsne3231ab0a268",
        "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
      },
    };
    const destination = {
      method: "GET",
      url: "https://skyscanner44.p.rapidapi.com/autocomplete",
      params: { query: req.body.destination },
      headers: {
        "X-RapidAPI-Key": "f9d151f0edmsh5c990cda3c5851bp105b5fjsne3231ab0a268",
        "X-RapidAPI-Host": "skyscanner44.p.rapidapi.com",
      },
    };

    try {
      let IATAOrigin = await axios.request(origin);
      let IATADestination = await axios.request(destination);
      IATAOrigin =
        req.body.origin == "jakarta" || req.body.origin == "Jakarta" ? "CGK" : IATAOrigin.data[0].iata_code;
      IATADestination = req.body.destination == "jakarta" || req.body.destination == "Jakarta" ? "CGK" : IATADestination.data[0].iata_code;

      res
        .status(200)
        .json({
          link: `https://www.traveloka.com/en-id/flight/fulltwosearch?ap=${IATAOrigin}.${IATADestination}&dt=${req.body.departure}.${req.body.return}&ps=${req.body.pax}.0.0&sc=ECONOMY`,
        });
        console.log({
          link: `https://www.traveloka.com/en-id/flight/fulltwosearch?ap=${IATAOrigin}.${IATADestination}&dt=${req.body.departure}.${req.body.return}&ps=${req.body.pax}.0.0&sc=ECONOMY`,
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async hotelsPrompt(req, res) {
    try {
      console.log('running');
      let vibes = " ";
      if (req.body.type == "romantic") vibes = " romantic ";
      if (req.body.type == "family") vibes = " family ";
      if (req.body.type == "adventurous") vibes = " adventurous ";
      if (req.body.type == "solo") vibes = " ";
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Give me a recommendation of${vibes}place to stay in ${req.body.destination} with a budget of ${req.body.budget} rupiah. Format the output as a JSON array of objects like this.
                  [
                    {
                      placeToStay:
                      address:
                      pricePerNight:
                      description:
                    }
                  ]
                make value type of pricePerNight Integer and please avoid using newline characters in the output.`,
          },
        ],
        max_tokens: 4000,
        temperature: 0.8,
      });
      console.log(completion.data.choices[0].message.content);
      const result = JSON.parse(completion.data.choices[0].message.content);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async placesPrompt(req, res) {
    try {
      console.log('running');
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user", 
            content: `Give me 9 recommendations of ${req.body.type} destination in ${req.body.destination} with a budget of ${req.body.budget} rupiah. Format the output as a JSON array of objects like this.
                        [
                          {
                            placeToVisit:
                            description:
                            address:
                            toDo:
                          }
                        ]
                  please avoid using newline characters in the output.`,
          },
        ],
        max_tokens: 4000,
        temperature: 0.8,
      });
      console.log(completion.data.choices[0].message.content);
      const result = JSON.parse(completion.data.choices[0].message.content);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  static async itineraryPrompt(req, res) { //! jangan lupa stringify kalau awalnya bentukannya object
    try {
        console.log("running");
        console.log(req.body.trip);
        const stringTrip = JSON.parse(req.body.trip)
        const formattedTrip = stringTrip.map(el => el.placeToVisit)
        const duration = (+req.body.return.split("-")[0]) - (+req.body.departure.split("-")[0]) + 1
        let result
        console.log(duration);
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Make me a complete to do itinerary for ${duration} days based on this array ${formattedTrip}. Format the output as an array of object like this.
                [
                  day[number]: (complete recommendation on what to in that place)
                ]
              Please avoid using newline characters or \n in the output.`,
            },
          ],
          max_tokens: 4000,
          temperature: 0.6,
        });
        try {
            result = JSON.parse(completion.data.choices[0].message.content);
        } catch (err) {
            result = completion.data.choices[0].message.content
        }
        console.log(result);
        res.status(200).json(result)
      } catch (err) {
        console.log(err);
        res.status(500).json(err) 
      }
  }  
}

module.exports = GPTController;
