import { FaTrash, FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"
import { toast } from "react-hot-toast";

const SmoothieCard = ( { smoothie, onDelete } ) => {
    const handleClick = async () => {
        const { data, error } = await supabase
            .from( "smoothies" )
            .delete()
            .eq( "id", smoothie.id )
            .select()
        
        if ( error ) {
            toast.error( "Could not delete the smoothie." )
        }
        if ( data ) {
            onDelete( smoothie.id )
        }
    }
    return (
        <div className="w-[100%] p-[10px] bg-white box-border rounded-md relative">
            <h3 className="text-lg font-bold mb-4">{ smoothie.name }</h3>
            <p className="tracking-wide text-sm">{ smoothie.preparation }</p>
            <div className="absolute -top-[10px] -right-[10px] bg-[#6d15df] text-white rounded-md w-10 h-0 py-5 px-0 text-center leading-[0]">{ smoothie.rating }</div>
            <div className="flex gap-2">
                <Link to={ `/${ smoothie.id }` }>
                    <FaEdit className="text-green-600 bg-green-200 text-2xl p-1 rounded-md mt-2" />
                </Link>
                <FaTrash className="text-red-600 bg-red-200 text-2xl p-1 rounded-md mt-2" onClick={handleClick} />
            </div>
        </div>
    )
}

export default SmoothieCard