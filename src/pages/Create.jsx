import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate()
    
    const [ name, setName ] = useState( "" )
    const [ preparation, setPreparation ] = useState( "" )
    const [ rating, setRating ] = useState( 0.0 )

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        if ( !name || !preparation || !rating ) {
            toast.error( "Please fill all the required fields." )
            return
        }
        
        const { data, error } = await supabase
            .from( "smoothies" )
            .insert( [ { name, preparation, rating } ] )
            .select()
        
        if ( error ) {
            toast.error( "Please fill in all the fields correctly." )
        }
        if ( data ) {
            navigate( "/" )
        }
    }
    
    return (
        <>
            <div className="max-w-[1200px] my-5 mx-auto p-5">
                <form onSubmit={handleSubmit} className="bg-white p-5 max-w-[480px] my-0 mx-auto rounded-md">
                    <label className="font-bold tracking-wider opacity-90">Name</label>
                    <input type="text" value={ name } onChange={ ( e ) => setName( e.target.value ) } className="block w-[100%] p-[6px] box-border border-[1px] border-solid border-[#cccccc] outline-none my-[10px] mx-0 rounded-md" placeholder="Papaya Passion" />

                    <label className="font-bold tracking-wider opacity-90">Preparation</label>
                    <textarea rows="5" value={ preparation } onChange={ ( e ) => setPreparation( e.target.value ) } className="block w-[100%] p-[6px] box-border border-[1px] border-solid border-[#cccccc] outline-none my-[10px] mx-0 rounded-md" placeholder="Enter your smoothie preparation instructions here..." />

                    <label className="font-bold tracking-wider opacity-90">Rating</label>
                    <input type="number" step="0.5" value={ rating } onChange={ ( e ) => setRating( e.target.value ) } className="block w-[100%] p-[6px] box-border border-[1px] border-solid border-[#cccccc] outline-none my-[10px] mx-0 rounded-md" />

                    <button className="bg-[#12bca2] text-white border-none rounded-md py-[6px] px-2 font-semibold tracking-wider">Create Smoothie Recipe</button>
                </form>
            </div>
            <Toaster />
        </>
    )
}

export default Create