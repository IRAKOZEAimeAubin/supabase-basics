const SmoothieCard = ( { smoothie } ) => {
    return (
        <div className="w-[100%] p-[10px] bg-white box-border rounded-md relative">
            <h3 className="text-lg font-bold mb-4">{ smoothie.name }</h3>
            <p className="tracking-wide text-sm">{ smoothie.preparation }</p>
            <div className="absolute -top-[10px] -right-[10px] bg-[#6d15df] text-white rounded-md w-10 h-0 py-5 px-0 text-center leading-[0]">{ smoothie.rating }</div>
        </div>
    )
}

export default SmoothieCard