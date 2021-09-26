import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { format } from "date-fns"
import InforCard from "../components/InforCard";
import SearchPageFilter from "../components/SearchPageFilter";
import DropdownMenu from "../components/DropdownMenu";
import { useState } from "react";

function Search({ searchResults }) {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);

    const { location, startDate, endDate, noOfGuests } = router.query;
    
    const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formatedStartDate} - ${formatedEndDate}`

    return (
        <div>
            <Header placeHolder={`${location} | ${range} | ${noOfGuests} guests`}/>

                <main className="flex font-railway">
                    <section className="flex-grow pt-14 px-6">
                        <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>
                        <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                        
                        <div className="hidden lg:inline-flex mb-5
                            space-x-3 text-gray-800 whitespace-nowrap z-10">
                            
                            <SearchPageFilter name="Free cancellation" />                         

                            <SearchPageFilter name="Type of Place" /> 

                            <SearchPageFilter name="Price" /> 

                            <SearchPageFilter name="Instant Book" /> 

                            {/* TODO: Modal for more filters */}
                            <p className="buttonOnHover">More filters</p>

                        </div>

                        <div className="flex flex-col">
                            {searchResults.map(
                                ({img, location, title, description, star, price, total}) => (
                                <InforCard 
                                    key={img}
                                    img={img}
                                    location={location}
                                    title={title}
                                    description={description}
                                    star={star}
                                    price={price}
                                    total={total}
                                />
                            ))}
                        </div>

                    </section>
                </main>

            <Footer />
        </div>
    )
}

export default Search

// Use context to get information from api
export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").
        then(res => res.json());
    
    return {
        props: {
            searchResults,
        },
    };
}