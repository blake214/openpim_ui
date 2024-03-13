"use client"
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import styles from "./style.module.css"
import CustomButton from "../custom_button/custom_button";
import CustomLink from "../custom_link/custom_link";

export default function PrimarySearchBar() {
    let [suggestions, setSuggestions] = useState([
        "Suggestion 1",
        "Suggestion 2",
        "Suggestion 3",
        "Suggestion 4",
        "Suggestion 5"
    ])
	return (
        <div className = {styles.container}>
            <div className = {styles.searchbar_container}>
                <input 
                    placeholder="Search products, brands, categories ..." 
                    type="text" 
                    autoComplete="off"
                    name="search"
                />
                <CustomButton><IoMdSearch size={25} cursor="pointer"/></CustomButton>
            </div>
            {suggestions.length && (
                <div className = {styles.suggestion_container}>
                    { suggestions.map( suggestion => (
                        <CustomLink key={suggestion} component_type="vertical" href="/search" >
                            {suggestion}
                        </CustomLink>
                    ))}
                </div>
            )}
        </div>
	);
}