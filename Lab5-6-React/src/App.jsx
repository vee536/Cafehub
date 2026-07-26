import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [cafes, setCafes] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");

  useEffect(() => {

    axios
      .get("http://localhost:3000/api/cafes")
      .then((response) => {

        setCafes(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const addCafe = async (e) => {

    e.preventDefault();

    if (!name || !location || !event) {

      alert("Please fill all fields");

      return;

    }

    const newCafe = {

      name,
      location,
      event,
      rating: 4.5

    };

    try {

      await axios.post(
        "http://localhost:3000/api/cafes",
        newCafe
      );

      const response = await axios.get(
        "http://localhost:3000/api/cafes"
      );

      setCafes(response.data);

      setName("");
      setLocation("");
      setEvent("");

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-[#E8DCC5]">

      {/* Navbar */}

      <nav className="bg-[#E8DCC5] shadow-md flex justify-between items-center px-10 py-5">

        <h1 className="text-3xl font-bold text-[#4B5136]">

          CafeHub

        </h1>

        <div className="space-x-6 font-semibold text-[#4B5136]">

          <a href="#">Home</a>

          <a href="#">Events</a>

          <a href="#">Community</a>

          <a href="#">Contact</a>

        </div>

      </nav>


      {/* Hero Section */}

      <section

        className="h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-center text-white"

        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80')"
        }}

      >

        <h1 className="text-6xl font-bold mb-5">

          Discover Cafés Beyond Coffee

        </h1>

        <p className="max-w-2xl text-lg">

          Find cafés, coding meetups, networking sessions,
          workshops and book clubs all in one place.

        </p>

        <button className="bg-[#6B4426] mt-8 px-8 py-3 rounded-full hover:bg-[#4B5136] duration-300">

          Explore Cafes

        </button>

      </section>


      {/* Statistics */}

      <section className="grid md:grid-cols-3 bg-white text-center py-10">

        <div>

          <h2 className="text-4xl font-bold text-[#6B4426]">

            120+

          </h2>

          <p>Partner Cafes</p>

        </div>

        <div>

          <h2 className="text-4xl font-bold text-[#6B4426]">

            350+

          </h2>

          <p>Events Hosted</p>

        </div>

        <div>

          <h2 className="text-4xl font-bold text-[#6B4426]">

            5000+

          </h2>

          <p>Community Members</p>

        </div>

      </section>


      {/* Form */}

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">

        <h2 className="text-3xl font-bold text-[#4B5136] mb-6">

          Register a New Cafe

        </h2>

        <form onSubmit={addCafe}>

          <input
            type="text"
            placeholder="Cafe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <input
            type="text"
            placeholder="Event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="border p-3 rounded-lg w-full mb-4"
          />

          <button
            className="bg-[#6B4426] text-white w-full py-3 rounded-lg hover:bg-[#4B5136]"
          >

            Add Cafe

          </button>

        </form>

      </div>


      {/* Cafe Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">

        {

          cafes.map((cafe) => (

            <div

              key={cafe._id}

              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300"

            >

              <img

                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"

                className="w-full h-52 object-cover"

                alt="Cafe"

              />

              <div className="p-5">

                <h2 className="text-2xl font-bold text-[#4B5136]">

                  {cafe.name}

                </h2>

                <p className="mt-3">

                  {cafe.location}

                </p>

                <p>

                  {cafe.event}

                </p>

                <p className="mt-2 font-semibold">

                  ⭐ {cafe.rating}

                </p>

                <button

                  className="bg-[#4B5136] text-white w-full py-3 rounded-lg mt-5 hover:bg-[#6B4426]"

                >

                  Join Event

                </button>

              </div>

            </div>

          ))

        }

      </div>


      {/* Footer */}

      <footer className="bg-[#2C2416] text-white text-center py-6">

        © 2026 CafeHub • Built using React, Axios, Tailwind CSS & Vite

      </footer>

    </div>

  );

}

export default App;