import { useEffect, useState } from "react";

const getLocaldata =()=>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

function App() {
  const [inputData , setInputData] = useState("");
  const [items , setitems] = useState(getLocaldata());
  const [isEdititem , setEditItem] = useState("");
  const [toggle , setToggle] = useState(false);


  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));
  }, [items]);

  // function to add items that is called when add items button is clicked
  const additems = (e) => {


    e.preventDefault();
    if(inputData && toggle){
      setitems(
        items.map((curr)=>{
          if(curr.id === isEdititem){
            return {...curr , name : inputData};
          }
          return curr;
        })
      )
      setInputData();
      setToggle(false);
      setEditItem(null);
    }
    else{
      const newInput = {
      id : new Date().getTime().toString(),
      name : inputData
    }
    setitems([...items , newInput]);
  }
    setInputData("");
  }


  //function to delete the item
  const deleteitem = (index) =>{
    // index.preventDefault();
    const updatedlist = items.filter((curr)=>{
      return curr.id !== index ;
    })

    setitems(updatedlist);

  }


  //function to remove all tasks
  const RemoveAll = ()=>{
    setitems([]);
  }


  //function to edit item
  const editItem = (index) =>{
    const edit_todo = items.find((item)=>{
      return item.id === index;
    });
    setInputData(edit_todo.name);
    setToggle(true);
    setEditItem(index);
  }

  return (
    <div className="App">
      <br /> <br />
      <div className="card" style={{ width: "40rem", margin: "auto" }} >

        <div className="card-body" style={{ margin: "auto", textAlign: "center" }}>

          <form className="row g-3" >
            <h5 className="card-title"><button onClick={(e)=>{e.preventDefault()}} className="btn btn-warning btn-lg" style={{fontSize:"2rem" , color:"white"}}>Tasks</button></h5><hr />
            <div className="col-auto">
              <label for="inputPassword2" className="visually-hidden">Password</label>
              <input type="text" className="form-control" id="inputPassword2" placeholder="Enter tasks here..."
              // setting values to our input tag
              value={inputData} onChange={(e)=> setInputData(e.target.value)} style={{ width: "30rem", border: "2px solid RGB(167 185 204)" }} />
            </div>
            <div className="col-auto">
              {/* adding items whe button is clicked  */}

              { toggle ? <button className="btn btn-success btn-sm" onClick={additems}>Update</button> : <button   className="btn btn-primary"
             onClick={additems} >Add Task</button> }
              
            </div>
          </form>

        </div>
        {/* showing all the items that we have added */} 

        <div className="show-tasks" style={{  width: "70%", margin: "auto" }}>
          <div className="task">
          <ul className="list-group" >
          {items.map((item , index)=>{
            return(
              
              <li className="list-group-item" style={{  backgroundColor:"#7430fa" , color:"white" ,  fontSize:"1.5rem" }}  key={index} >
                <span>{item.name}</span>

                <div className="task-button" style={{  display:"inline-block", float: "right" }} >
                        <button className="btn btn-success btn-sm" onClick={()=>{editItem(item.id)}}>Update</button>
                  &nbsp;<button className="btn btn-danger btn-sm" onClick={()=>{deleteitem(item.id)}}>Delete</button>
                </div>
              </li>
              

            
            )
          })}
          </ul>
          <br/>
          <center><button className="btn btn-secondary btn-lg" onClick={RemoveAll}>Clear Tasks</button></center>
            
          </div>
          <br /><br />

        </div>
      </div>
    </div>
  );
}

export default App;
