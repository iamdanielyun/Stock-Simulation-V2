import {useState, useEffect} from 'react';
import SymbolsDropdown from './SymbolsDropdown';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function SearchForm() {
    var [symbol, setSymbol] = useState("");
    var [user_typed, setUser_typed] = useState(false);

    //when user click on "x" button to clear field
    const handleClear = () => {
        setSymbol('');
      };

    return (
            <form>
                <div className="search-form">
                    <TextField
                        id="input-with-icon-textfield"
                        label="Search Symbols"
                        placeholder="e.g. NVDA"
                        autoComplete='off'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: symbol.trim() != "" && (
                                <InputAdornment position="end" onClick={handleClear}>
                                    <ClearIcon/>
                                </InputAdornment>
                            ),
                            style: {
                                border: "none",
                                fontFamily: "Inter UI,SF Pro Display,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif"
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontFamily: "Inter UI,SF Pro Display,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif"
                            }
                        }}
                        variant="standard"
                        value={symbol}  
                        onChange={(e) => {
                            setSymbol(e.target.value);  
                            setUser_typed(true);
                        }}
                    />
                </div>

                {(user_typed && symbol.trim() != "")? (
                    <SymbolsDropdown data={symbol.trim()} show={true}/>
                ): (
                    user_typed = false
                )}                                
            </form>
    )
}

export default SearchForm;
