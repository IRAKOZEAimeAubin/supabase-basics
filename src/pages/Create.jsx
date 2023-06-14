import { useState } from "react";

const Create = () => {
    const [ name, setName ] = useState( "" )
    const [ preparation, setPreparation ] = useState( "" )
    const [ rating, setRating ] = useState( 0.0 )
    const [ formError, setFormError ] = useState( null )

    const handleSubmit = async () => { }
    
    return (
        <div className="max-w-[1200px] my-5 mx-auto p-5">
            <form>
                <label>Name</label>
                <input type="text" value={ name } onChange={ ( e ) => setName( e.target.value ) } />

                <label>Preparation</label>
                <textarea value={ preparation } onChange={ ( e ) => setPreparation( e.target.value ) } />

                <label>Rating</label>
                <input type="number" value={ rating } onChange={ ( e ) => setRating( e.target.value ) } />

                <button>Create Smoothie Recipe</button>

                { formError && ( <p>{ formError }</p> ) }
            </form>
        </div>
    )
}

export default Create