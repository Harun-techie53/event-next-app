import { Fragment } from 'react';
import Head from "next/head";

import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/EventSummary/event-summary';
import EventLogistics from '../../components/event-detail/EventLogistics/event-logistics';
import EventContent from '../../components/event-detail/EventContent/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import CommentList from '../../components/comments/comment-list';
import NewComment from '../../components/comments/new-comment';
import Comments from '../../components/comments/comments';
import Layout from '../../components/layout/layout';

function EventDetailPage(props) {
  const event = props.selectedEvent;
  const eventId = event.id;

  if (!event) {
    return (
      <div className="center">
        <Head>
          <title>Loading...</title>
        </Head>
        <p>Loading...</p>
      </div>
    );
  }

  // useEffect(() => {
  //   dbConnection();
  // }, []);
  

  return (
    <Fragment>
      <Layout>
        <Head>
          <title>
            {event.title}
          </title>
          <meta name="description" content={event.description} />
        </Head>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
        <Comments eventId={eventId}/>
      </Layout>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.event_id;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { event_id: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;