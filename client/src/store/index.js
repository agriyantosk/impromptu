import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

const useStore = create((set) => ({
  name: "",
  email: "",
  password: "",
  dateOfBirth: "",
  phoneNumber: "",
  address: "",
  friends: "",
  url: "http://localhost:3000",
  tripName: "",
  searchedUser: "",
  searchResult: "",
  tripById: "",
  itinerary: "",
  expenses: "",
  notes: "",
  location: "",
  journals: [],
  journal: [],
  createdTripId: "",

  updateCreatedTripId: (createdTripId) =>
    set(() => ({ createdTripId: createdTripId })),
  updateName: (name) => set(() => ({ name: name })),
  updateFriends: (friends) => set(() => ({ friends: friends })),
  updateEmail: (email) => set(() => ({ email: email })),
  updatePassword: (password) => set(() => ({ password: password })),
  updateDateOfBirth: (dateOfBirth) => set(() => ({ dateOfBirth: dateOfBirth })),
  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber: phoneNumber })),
  updateAddress: (address) => set(() => ({ address: address })),
  updateTripName: (tripName) => set(() => ({ tripName: tripName })),
  updateSearchedUser: (searchedUser) =>
    set(() => ({ searchedUser: searchedUser })),
  updateSearchResult: (searchResult) =>
    set(() => ({ searchResult: searchResult })),
  updateTripById: (tripById) => set(() => ({ tripById: tripById })),
  updateItinerary: (itinerary) => set(() => ({ itinerary: itinerary })),
  updateJournal: (journal) => set(() => ({ journal: journal })),
  updateExpenses: (expenses) => set(() => ({ expenses: expenses })),
  updateNotes: (notes) => set(() => ({ notes: notes })),
  updateLocation: (location) => set(() => ({ location: location })),

  register: async () => {
    try {
      const { name, email, password, dateOfBirth, phoneNumber, address, url } =
        useStore.getState();

      const { data } = await axios({
        method: "POST",
        url: `${url}/user/register`,
        data: {
          name,
          email,
          password,
          dateOfBirth,
          phoneNumber,
          address,
        },
      });
      console.log(data);
      return "success";
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  },
  login: async () => {
    try {
      const { email, password, url } = useStore.getState();
      const { data } = await axios({
        method: "POST",
        url: `${url}/user/login`,
        data: {
          email,
          password,
        },
      });
      console.log();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);
      return "success";
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message}`,
      });
    }
  },
  createTrip: async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const { trip, url, updateCreatedTripId } = useStore.getState();
      const { data } = await axios({
        method: "POST",
        data: {
          tripName: trip,
        },
        headers: {
          access_token: access_token,
        },
        url: `${url}/trip/create`,
      });
      // Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     title: "Success Create Trip",
      //     showConfirmButton: false,
      //     timer: 1000,
      // });
      // console.log(data.id)
      updateCreatedTripId(data.id);
    } catch (error) {
      console.log(error);
      // Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: `${error?.response?.data?.message}`,
      // });
    }
  },
  fetchFriends: async () => {
    const { updateFriends } = useStore.getState();
    try {
      // const {updateFriends} = useStore.getState()
      const { data } = await axios.get(`http://localhost:3000/user/fetch`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      updateFriends(data.fetch);
      return data.fetch;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message}`,
      });
    }
  },

  fetchRooms: async () => {
    try {
      const { url, updateTripList } = useStore.getState();
      const { data } = await axios({
        method: "GET",
        url: `${url}/trip`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  fetchTripDetail: async (id) => {
    try {
      const { url } = useStore.getState();
      const { data } = await axios({
        method: "GET",
        url: `${url}/trip/${id}`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  removeMember: async (id) => {
    try {
      console.log(id, "mau delete member ni");
      const { url } = useStore.getState();
      const data = await axios({
        method: "DELETE",
        headers: {
          access_token: localStorage.access_token,
        },
        url: `${url}/user/remove`,
        data: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  searchUser: async (searchInput) => {
    try {
      const { url, updateSearchResult } = useStore.getState();
      const { data } = await axios.post(
        `${url}/user/search`,
        { searchInput: searchInput },
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      );
      updateSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  },
  addFriend: async (id) => {
    try {
      const { url } = useStore.getState();
      const { data } = await axios.post(
        `${url}/user/add`,
        { id: id },
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  },
  removeFriend: async (id) => {
    try {
      const { url, fetchFriends } = useStore.getState();
      const { data } = await axios({
        method: "delete",
        url: `${url}/user/remove`,
        data: { id },
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      await fetchFriends();
    } catch (error) {
      console.log(error);
    }
  },
  inviteFriend: async (tripId, newParticipantId) => {
    try {
      const { url, fetchFriends } = useStore.getState();
      const { data } = await axios({
        method: "POST",
        url: `${url}/trip/invite/${tripId}`,
        data: { newTripParticipant: newParticipantId },
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  },
  fetchTripById: async (tripId) => {
    try {
      const { url, updateTripById } = useStore.getState();
      const { data } = await axios({
        method: "GET",
        url: `${url}/trip/${tripId}`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      updateTripById(data);
    } catch (error) {
      console.log(error);
    }
  },
  deleteTripById: async (tripId) => {
    try {
      const { url, updateTripById } = useStore.getState();
      const { data } = await axios({
        method: "DELETE",
        url: `${url}/trip/delete/${tripId}`,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addActivity: async (tripId, input) => {
    try {
      const { url, updateTripById } = useStore.getState();
      const { data } = await axios({
        method: "POST",
        url: `${url}/trip/activity/add/${tripId}`,
        data: input,
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteActivity: async (tripId, dayIndex, activityIndex) => {
    try {
      const { url, fetchTripById } = useStore.getState();
      const { data } = await axios({
        method: "DELETE",
        url: `${url}/trip/activity/delete/${tripId}`,
        data: {
          dayIndex,
          activityIndex,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  },
  editBudget: async (tripId, dayIndex, inputBudget) => {
    try {
      const { url, fetchTripById } = useStore.getState();
      const { data } = await axios({
        method: "PUT",
        url: `${url}/trip/budget/edit/${tripId}`,
        data: {
          dayIndex,
          inputBudget,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  },
  fetchJournalById: async (id) => {
    try {
      if (id) {
        const { data } = await axios({
          method: "GET",
          url: `http://localhost:3000/journal/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        set({ journals: data });
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchOneJournal: async (id) => {
    try {
      if (id) {
        const { data } = await axios({
          method: "GET",
          url: `http://localhost:3000/journal/one/${id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        set({ journal: data[0] });
        set({ name: data[0].name });
        set({ expenses: data[0].expenses });
        set({ notes: data[0].notes });
        set({ location: data[0].location });
      }
      // return data
    } catch (error) {
      console.log(error);
    }
  },

  addJournal: async (id) => {
    try {
      if (id) {
        // console.log(id,"INI ID DI STROREEEE ADD JOURNAL");
        const { name, expenses, notes, location, fetchJournalById } =
          useStore.getState();
        console.log(
          { name, expenses, notes, location },
          "INI DI ADDD JOURNALL"
        );
        console.log(localStorage.access_token);
        const { data } = await axios({
          method: "POST",
          url: `http://localhost:3000/journal/add/${id}`,
          data: {
            name,
            expenses,
            notes,
            location,
          },
          headers: {
            access_token: localStorage.access_token,
          },
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success add Journal",
          showConfirmButton: false,
          timer: 1000,
        });
        fetchJournalById(id);
        console.log(data);
        return "succes";
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message}`,
      });
    }
  },

  editJournal: async (id, tripId) => {
    try {
      if (id) {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You will overwrite the journal!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#26a69a",
          confirmButtonText: "Yes, Edit!",
        });

        if (result.isConfirmed) {
          // edit
          const { name, expenses, notes, location, fetchJournalById } =
            useStore.getState();
          console.log(
            { name, expenses, notes, location },
            "INI DI EDITTTTTTT JOURNALL"
          );
          console.log(localStorage.access_token);
          const { data } = await axios({
            method: "PUT",
            url: `http://localhost:3000/journal/edit/${id}`,
            data: {
              name,
              expenses,
              notes,
              location,
            },
            headers: {
              access_token: localStorage.access_token,
            },
          });

          if (data !== null) {
            console.log(data, "<<<");
            const result = await Swal.fire(
              "Edited",
              "Your file has been edited.",
              "success"
            );

            if (result.isConfirmed) {
              fetchJournalById(tripId);

              return "succes edit";
            }
          }
        }
        // console.log(id,"INI ID DI STROREEEE ADD JOURNAL");
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteJournal: async (id, tripId) => {
    try {
      if (id) {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#26a69a",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          const { fetchJournalById } = useStore.getState();
          const { data } = await axios({
            method: "Delete",
            url: `http://localhost:3000/journal/delete/${id}`,
            headers: {
              access_token: localStorage.access_token,
            },
          });
          if (data !== null) {
            const result = await Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );

            if (result.isConfirmed) {
              fetchJournalById(tripId);
              return "success delete";
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  removeParticipant: async (tripId, participantId) => {
    try {
      const { url, fetchTripDetail } = useStore.getState();
      const { data } = await axios({
        method: "DELETE",
        url: `${url}/trip/remove/${tripId}`,
        data: {
          participantId,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message}`,
      });
    }
  },
  trip: "",
  origin: "",
  destination: "",
  departure: "",
  returnDate: "",
  budget: "",
  type: "",
  ticketPrice: 0,
  //   url: "http://localhost:3333",
  flightReady: false,
  queryReady: false,
  loading: false,
  hotels: [],
  places: [],
  duration: 0,
  itineraries: "",

  updateItinerary: (itinerary) => set(() => ({ itineraries: itinerary })),
  updateDuration: (duration) => set(() => ({ duration: duration })),
  updateTrip: (trip) => set(() => ({ trip: trip })),
  updateOrigin: (origin) => set(() => ({ origin: origin })),
  updateDestination: (destination) => set(() => ({ destination: destination })),
  updateDeparture: (departure) => set(() => ({ departure: departure })),
  updateReturn: (r) => set(() => ({ returnDate: r })),
  updateBudget: (budget) => set(() => ({ budget: budget })),
  updateType: (type) => set(() => ({ type: type })),
  updateFlightReady: (flight) => set(() => ({ flightReady: flight })),
  updateQueryReady: (query) => set(() => ({ queryReady: query })),
  updateTicket: (ticket) => set(() => ({ ticketPrice: ticket })),
  updateLoading: (loading) => set(() => ({ loading: loading })),
  updateHotels: (hotels) => set(() => ({ hotels: hotels })),
  updatePlaces: (places) => set(() => ({ places: places })),

  getFlight: async () => {
    try {
      const {
        origin,
        destination,
        departure,
        returnDate,
        url,
        updateFlightReady,
        updateQueryReady,
      } = useStore.getState();
      const formattedDeparture = new Date(departure)
        .toLocaleDateString("id", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replaceAll("/", "-");
      const formattedReturn = new Date(returnDate)
        .toLocaleDateString("id", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replaceAll("/", "-");
      console.log(formattedDeparture, formattedReturn);
      const flight = await axios.post(`${url}/flights`, {
        origin,
        destination,
        departure: formattedDeparture,
        return: formattedReturn,
        pax: 2,
      });
      updateFlightReady(flight.data.link);
      updateQueryReady(true);
    } catch (err) {
      console.log(err);
    }
  },

  getItinerary: async () => {
    try {
      const {
        origin,
        destination,
        departure,
        returnDate,
        budget,
        type,
        url,
        ticketPrice,
        updateHotels,
        updateLoading,
        updatePlaces,
        hotels,
        places,
        updateDuration,
        duration,
      } = useStore.getState();

      const formattedDeparture = new Date(departure)
        .toLocaleDateString("id", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replaceAll("/", "-");
      const formattedReturn = new Date(returnDate)
        .toLocaleDateString("id", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replaceAll("/", "-");
      updateLoading(true);
      console.log(
        +formattedReturn.split("-")[0] - +formattedDeparture.split("-")[0] + 1
      );
      updateDuration(
        +formattedReturn.split("-")[0] - +formattedDeparture.split("-")[0] + 1
      );
      await Promise.all([
        axios
          .post(`${url}/hotels`, {
            type,
            destination,
            budget: +budget - +ticketPrice,
          })
          .then((response) => {
            updateHotels(response.data);
          }),
        axios
          .post(`${url}/places`, {
            type,
            destination,
            budget: +budget - +ticketPrice,
          })
          .then((response) => {
            updatePlaces(response.data);
          }),
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      const { updateLoading } = useStore.getState();
      updateLoading(false);
    }
  },
  factory: async (hotelInfo, picks) => {
    const { hotels, places, updateItinerary } = useStore.getState();
    const obj2 = {
      accommodation: {},
      itinerary: [],
    };
    console.log(hotelInfo);
    obj2.accommodation = hotels[hotelInfo];
    console.log(picks);
    for (let i = 0; i < picks.length; i++) {
      const itineraryInput = {
        day: [],
        budget: 0,
      };
      const pick = picks[i]; // putaran pertama => [0, 3, 4]
      for (let m = 0; m < pick.length; m++) {
        const pickk = pick[m]; // putaran kedua => 3
        for (let j = 0; j < places.length; j++) {
          const place = places[j];
          if (j === pickk) {
            itineraryInput.day.push(place);
          }
        }
      }
      obj2.itinerary.push(itineraryInput);
    }
    console.log(obj2);
    updateItinerary(obj2);
  },
  saveItineraries: async () => {
    try {
      const { itineraries, createdTripId, url } = useStore.getState();
      const response = await axios.post(`${url}/trip/save-itenararies/${createdTripId}`,{
        itenararies: itineraries
    }, {
        headers: {
            access_token: localStorage.access_token
        }
      })
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useStore;
