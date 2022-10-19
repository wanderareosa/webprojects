import './style.css'

export const TextInput = ({searchValue, handleInputChange})=>{

	return(
        <input 
          className="text-input"
          type="search"
          onChange={handleInputChange}
          value={searchValue}
          placeholder="type your search"
        />			
	);

}