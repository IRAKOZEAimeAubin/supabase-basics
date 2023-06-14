import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { data } from "autoprefixer";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
    const [ fetchError, setFetchError ] = useState( null )
    const [ smoothies, setSmoothies ] = useState( null )
    
    useEffect( () => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from( "smoothies" )
                .select()
            
            if ( error ) {
                setFetchError( "Could not fetch smoothies..." )
                setSmoothies( null )
                console.log( error )
            }
            if ( data ) {
                setSmoothies( data )
                setFetchError( null )
                console.log( data )
            }
        }
        fetchSmoothies()
    }, [] )

    return (
        <div className="max-w-[1200px] my-5 mx-auto p-5">
            { fetchError && ( <p className="text-lg font-semibold">{ fetchError } 😥</p> ) }
            { data && (
                <div className="mt-10 grid grid-cols-3 gap-10">
                    { smoothies?.map( smoothie => (
                        <SmoothieCard key={ smoothie.id } smoothie={ smoothie } />
                    ) ) }
                </div>
            ) }
        </div>
    )
}

export default Home