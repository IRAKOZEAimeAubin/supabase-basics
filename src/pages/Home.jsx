import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { data } from "autoprefixer";
import SmoothieCard from "../components/SmoothieCard";
import toast, { Toaster } from 'react-hot-toast'

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
                toast.error( "Could not fetch smoothies..." )
                setSmoothies( null )
            }
            if ( data ) {
                setSmoothies( data )
                setFetchError( null )
            }
        }
        fetchSmoothies()
    }, [] )

    const handleDelete = ( id ) => {
        setSmoothies( prevSmoothies => {
            return prevSmoothies.filter( sm => sm.id !== id )
        } )
    }

    return (
        <>
            <div className="max-w-[1200px] my-5 mx-auto p-5">
                { fetchError && ( <p className="text-lg font-semibold">{ fetchError } 😥</p> ) }
                { data && (
                    <div className="mt-10 grid grid-cols-3 gap-10">
                        { smoothies?.map( smoothie => (
                            <SmoothieCard key={ smoothie.id } smoothie={ smoothie } onDelete={ handleDelete } />
                        ) ) }
                    </div>
                ) }
            </div>
            <Toaster />
        </>
    )
}

export default Home