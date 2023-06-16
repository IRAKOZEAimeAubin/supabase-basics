import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { data } from "autoprefixer";
import SmoothieCard from "../components/SmoothieCard";
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
    const [ fetchError, setFetchError ] = useState( null )
    const [ smoothies, setSmoothies ] = useState( null )
    const [ orderBy, setOrderBy ] = useState( "created_at" )
    
    useEffect( () => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from( "smoothies" )
                .select()
                .order( orderBy, { ascending: true } )
            
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
    }, [ orderBy ] )

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
                    <div>
                        <div>
                            <p className="font-semibold tracking-wider">Order By:</p>
                            <button className="mr-[10px] bg-[#12bca2] text-white border-none py-1 px-2 rounded-md cursor-pointer" onClick={ () => setOrderBy( "created_at" ) }>Time Created</button>
                            <button className="mr-[10px] bg-[#12bca2] text-white border-none py-1 px-2 rounded-md cursor-pointer" onClick={ () => setOrderBy( "name" ) }>Name</button>
                            <button className="mr-[10px] bg-[#12bca2] text-white border-none py-1 px-2 rounded-md cursor-pointer" onClick={ () => setOrderBy( "rating" ) }>Rating</button>
                        </div>
                        <div className="mt-10 grid grid-cols-3 gap-10">
                            { smoothies?.map( smoothie => (
                                <SmoothieCard key={ smoothie.id } smoothie={ smoothie } onDelete={ handleDelete } />
                            ) ) }
                        </div>
                    </div>
                ) }
            </div>
            <Toaster />
        </>
    )
}

export default Home