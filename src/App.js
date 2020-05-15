import React, { useState, useEffect } from 'react';
import TextField from './components/Text'
import ShopList from './components/ShopList'
import './App.css';
import { fetchdata, fetchurgent } from "./components/api"
import Particle from './components/Particle'


//marginLeft Auto resolved everything !! 


function App() {

  const getCookie = name => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

// You need to get this funciton out if you want to re render it everytime ! 
  const runEffect = async () => {
    const fetchData = await fetchdata()
    setState(fetchData.data)
  }
  const runUrgent = async () => {
    const fetchData = await fetchurgent()
    setState(fetchData.data)
  }

  // if you get error uncontrolled / controlled then you need to check serializer, there are undefined properties ! 
  const [state, setState] = useState()
  const [sort,setSort] = useState(false)
  const [active, setActive] = useState({
    id:null,
    title:"",
    urgency:false,
  })
  // You had issues with the effect because the database from django was slow

  useEffect(() => {
    if (sort ===false){
      runEffect()
    }
    if (sort === true){
      runUrgent()
    }
  }, [sort]);
  const change = (event) => {
    setSort(!sort)
  }


  const startDelete = (item) => {
    let csrftoken = getCookie('csrftoken')
    fetch(`http://127.0.0.1:8000/shop/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'X-CSRFToken': csrftoken
      }
    }).then(response => {
      runEffect()
    })
  }

  const handleChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    setActive({
      ...active,
      [name]:value
    })
  }


  const handleSubmit = (event) => {
    let csrftoken = getCookie('csrftoken')
    event.preventDefault()
    let url = 'http://127.0.0.1:8000/shop'
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(active),
    }).then((response) => {
      runEffect()
      console.log(active)
      setActive(
        // you had an error here , the item added was added as an object but not in the array, you had to had the [] !
        [active]
      )
    })
      .catch(error => {
        console.log('error', error)
      })
      // // allow to clear the form
  }

  return (
    <div className="App">
      <Particle/>
      <div className="container">
        {/* remove the property to allow spread operator to work */}
        <TextField data={active} change={change} handleSubmit={handleSubmit} handleChange={handleChange}/>
        <ShopList data={state}  erase={startDelete} />
      </div>
    </div>
  );
}

export default App;
