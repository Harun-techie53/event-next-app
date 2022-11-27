import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList/event-list';
import Head from 'next/head';
import Layout from '../components/layout/layout';

function HomePage(props) {
  return (
    <div>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Find all events here." />
        </Head>
        <EventList items={props.events} />
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;