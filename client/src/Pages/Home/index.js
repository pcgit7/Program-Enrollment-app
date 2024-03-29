import React, { useEffect, useState } from "react";
import ProgramForm from "../../Components/ProgramForm";
import ProgramList from "./ProgramList";
import ProgramSearch from "./ProgramSearch";
import { useDispatch, useSelector } from "react-redux";
import { HideLoader, ShowLoader } from "../../Redux/loaderSlice";
import toast from "react-hot-toast";
import { DeleteProgram } from "../../ApiCalls/user";

const Home = () => {

  const [searchKey, setSearchKey] = useState("");
  
  const dispatch = useDispatch();
  const [program,setProgram] = useState({});

  const deleteProgram = async () => {

    try 
    {
      dispatch(ShowLoader());
      const response = await DeleteProgram(program.programId);
      dispatch(HideLoader());
      if(response.success){
        toast.success(response.message);
      }
      else{
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
    }
  };

  
  return (
    <div className="flex gap-20">
      <div className="w-1/4">
        <ProgramSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <ProgramList
          searchKey={searchKey}
          setProgram={setProgram}
          program={program}
        />
      </div>
      <div className="w-1/2">
      <ProgramForm deleteProgram={deleteProgram} program={program}/>
      </div>
    </div>
  );
};

export default Home;
