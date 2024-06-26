import React, { useState } from "react";
import Cookies from 'universal-cookie';
import CardArray from "./_CardArray";
import { useEffect } from "react";
import logo1 from "./assets/imgs/1.png";
import logo2 from "./assets/imgs/2.png";
import { useNavigate } from "react-router-dom";
const cookie = new Cookies();


const dummyData = [
  {
    id: 1,
    photo: logo1,
    title: "Test 1",
    tag: "Auto",
    description: "Auto driver he is",
    charge: 100,
  },
  {
    id: 2,
    photo: logo2,
    title: "Test 2",
    tag: "Prof",
    description: "Professor she is",
  },
];

export default () => {
  const token = cookie.get("TOKEN")
  const navigator = useNavigate();

  function filter() {
    let placeForm = document.getElementById("form");
    placeForm.classList.toggle("hidden");
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/customer/viewServices",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const body = await response.json();
      if(body){
        setLoading(false)
      }
      setData(body.data)
      // setTimeout(() => {
      //   console.log(body)
      //   if (body.isLogged === false) {
      //     navigator('/');
      //   } else {
      //     console.log(body);
      //     setData(body.data);
      //     setLoading(false);
      //   }
      // }, 1000);
    }

    fetchData();
  }, []);
  console.log(data)

  return (
    <div className="container mx-auto mb-5">
      <button
        type="button"
        className="border border-dark px-5 py-2 mb-2"
        onClick={filter}
      >
        Filters
      </button>
      <br />
      <form className="hidden" id="form" action="/filter">
        <select
          name="filter_details"
          className="form-select"
          aria-label="Default select example"
        >
          <option value="Electric">Electric</option>
          <option value="Auto-Rickshaw">Auto-Rickshaw</option>
        </select>
        <br />
        <input type="submit" />
      </form>
      <br />
      <div className="container-fluid">
        {loading ? <div>Loading...</div> : 
        <CardArray data={data} />
        // <div>content</div>
        }
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="border border-gray-400 px-4 py-2"
        >
          Previous
        </button>
        <button
          type="button"
          className="btn-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};
