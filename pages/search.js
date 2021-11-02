import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import InforCard from '../components/InforCard';
import client from '../utils/apollo-client';
import { gql } from '@apollo/client';

function Search({ lodgings }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formatedStartDate = format(new Date(startDate), 'dd MMMM yy');
  const formatedEndDate = format(new Date(endDate), 'dd MMMM yy');
  const range = `${formatedStartDate} - ${formatedEndDate}`;

  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  const days = Math.floor((end - start) / 8.64e7) + 1;

  return (
    <div>
      <Header placeHolder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div
            className="hidden lg:inline-flex mb-5
                            space-x-3 text-gray-800 whitespace-nowrap"
          >
            <p className="button">Free cancellation</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Instant Book</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {lodgings.map((lodging) => (
              <InforCard
                key={lodging._id}
                img={lodging.pictureUrls[0]}
                location={`${lodging.privacyType} in ${lodging.address.city}`}
                title={'Spacious house'}
                floorPlan={lodging.floorPlan}
                amenities={lodging.amenities}
                star={'4.5'}
                price={`$${lodging.pricePerDay} / day`}
                total={`$${parseInt(lodging.pricePerDay * days)} / total`}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

// Use context to get information from api
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Query {
        lodgings {
          _id
          propertyType
          privacyType
          floorPlan {
            guests
            beds
            bedrooms
            bathrooms
          }
          address {
            state
            city
            zipCode
            street
          }
          pricePerDay
          amenities
          pictureUrls
        }
      }
    `,
  });

  return {
    props: {
      lodgings: data.lodgings,
    },
  };
}
