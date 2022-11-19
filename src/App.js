import { useState, useEffect } from "react"
import axios from "axios"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Chart from "./chart"
import "./assign.css"
import Logo from "././images.png"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function App() {
  const [data, setData] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  }

  const labels = data.map((items) => {
    return items.time.slice(11, 13)
  })

  const cdata = {
    labels,
    datasets: [
      {
        label: "cases",
        data: data.map((item) => parseInt(item.cases.total)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 13, 0.5)",
      },
      {
        label: "Death",
        data: data.map((item) => parseInt(item.deaths.total)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "tests",
        data: data.map((item) => parseInt(item.tests.total)),
        borderColor: "rgb(253, 162, 235)",
        backgroundColor: "rgba(253, 162, 235, 0.5)",
      },
    ],
  }

  const getData = async () => {
    const options = {
      headers: {
        "X-RapidAPI-Key": "b9ad4e9938msh5e71b81e4ba2396p1e5c8djsne88a281aa0bd",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    }

    await axios
      .get("https://covid-193.p.rapidapi.com/statistics", options)

      .then((res) => {
        // console.log(res.data.response)
        const data = res.data.response
        setData(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className="App">
      <div className="header">
        <img src={Logo} id="image" alt="image" />
      </div>
      <div className="heading">
        <h1 className="title">COVID-19 Analysis System</h1>
        <p>
          Covid-19 disease' first case emerged in Wuhan, China. The disease was
          caused by Coronavirus which is very contagious and it spread quickly
          around the world. It resulted to respiratory complications to the
          exposed people and several deaths worldwide.
        </p>
        <p>
          CyHealth analysis gives a statistical representation of Covid-19
          history and how different countries were affected.
        </p>
        <h2>
          1. Table showing a statistical representation of Covid-19 in different
          countries
        </h2>
      </div>

      <div className="list">
        <div className="options">
          <div className="search">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input
              type="text"
              placeholder="Find a country"
              onInput={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
        </div>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>country</th>
            <th>continent</th>
            <th>day</th>
            <th>Time</th>
            <th>Population</th>
            <th>active cases</th>
            <th>critical cases</th>
            <th>new cases</th>
            <th>Recovered cases</th>
            <th>total cases</th>
            <th>new death</th>
            <th>total death</th>
            <th>total tests</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(({ country }) => country.toLowerCase().includes(search))
            .map((item) => {
              return (
                <tr>
                  <td>{item.country}</td>
                  <td>{item.continent}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>{item.population}</td>
                  <td>{item.cases.active}</td>
                  <td>{item.cases.critical}</td>
                  <td>{item.cases.new}</td>
                  <td>{item.cases.recovered}</td>
                  <td>{item.cases.total}</td>
                  <td>{item.deaths.new}</td>
                  <td>{item.deaths.total}</td>
                  <td>{item.tests.total}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <h2>2. This graph shows the hourly history of Covid-19</h2>
      <Line options={options} data={cdata} />

      <div className="footer">
        <div className="div11">
          <strong>TALK TO US</strong>
          <br />
          Kenya <br />
          P.O Box 20695 - 00200, Nairobi, Kenya <br />
          <br />
          Customer Care <br />
          Cell +254(0) 709 101 200 <br />
          WhatsApp +254(0) 748 070 000 <br />
          Email: clientservices@cytonn.com <br />
          <br />
          General Inquiries <br />
          Cell +254(0) 709 101 000 <br />
          Tel +254(0) 20 3929 000 <br />
          <br />
          United States <br />
          +1 (240) 368-6217 <br />
        </div>
        <div className="div1">
          <strong>KENYA</strong> <br /> 6th Floor, The Chancery, Valley Road,
          Nairobi, Kenya <br />
          3rd Floor, Sohan Plaza, Kimathi Way, Nyeri, Kenya <br /> <br />
          <strong>USA</strong>
          <br />
          Suite 1150, 1775 Eye Street NW, USA, Washington DC <br /> 20006, USA{" "}
          <br />
        </div>
        <div className="div1">
          <strong>ASSET MANAGERS</strong>
          <br />
          Money Market Fund <br />
          Pensions <br />
          <br />
          <strong>CAPITAL PARTNERS</strong>
          <br />
          Private Equity <br />
          Structured Products <br />
          Affordable Housing Investment Plan <br />
        </div>
        <div className="div1">
          <strong>REAL ESTATE</strong> <br />
          Applewood <br />
          RiverRun Estates <br />
          The Ridge <br />
          Taraji Heights <br />
          The Alma <br />
        </div>
      </div>
    </div>
  )
}

export default App
