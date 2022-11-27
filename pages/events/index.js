import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/EventList/event-list'
import EventsSearch from '../../components/events/EventSearch/event-search';
import Layout from '../../components/layout/layout';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Layout>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items={events} />
      </Layout>
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  };
}

export default AllEventsPage;