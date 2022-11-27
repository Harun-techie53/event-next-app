import ResultsTitle from "../../components/events/SearchResult/search-result";
import { getFilteredEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

function EventFilterPage() {
    const router = useRouter();
    const [allEvents, setAllEvents] = useState([]);
    const [allFilteredEvents, setAllFilteredEvents] = useState([]);

    // const {slug} = router.query;

    const dateFilter = {
        year: slug[0],
        month: slug[1]
    }

    const fetchAllEvents = async () => {
        try {
            const events = await getFilteredEvents(dateFilter);
            setAllEvents(events);
        } catch (error) {
            console.log("Error", error);
        }
    }

    // useEffect(() => {
    //     if(data) console.log(data)
    // }, [data]);
    // const fetchFilteredEvents = async () => {
    //     const filteredEvents = await getFilteredEvents(dateFilter);
    //     setAllFilteredEvents(filteredEvents);
    // }

    useEffect(() => {
      fetchAllEvents();
    }, [allEvents]);
    
    
    return (
        <div>
            <ResultsTitle/>
        </div>
    )
}

export default EventFilterPage;