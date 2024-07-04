import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Value from './_components/value';
import RingProgress from './_components/RingProgress';
import GoogleFit, { Scopes } from 'react-native-google-fit';

const Activity = () => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [flightsClimbed, setFlightsClimbed] = useState(0);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_BODY_READ,
    ],
  };

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      console.log(GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
    });

    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('AUTH_SUCCESS', authResult);
          fetchGoogleFitData();
        } else {
          console.log('AUTH_DENIED', authResult);
        }
      })
      .catch(() => {
        console.log('AUTH_ERROR');
      });

    const fetchGoogleFitData = () => {
      const startDate = new Date(2021, 10, 1).toISOString();
      const endDate = new Date().toISOString();

      GoogleFit.getDailyStepCountSamples({ startDate, endDate }).then(res => {
        console.log('Daily steps', res);
        if (res.length > 0) {
          const stepsData = res[0].steps;
          const totalSteps = stepsData.reduce((acc, day) => acc + day.value, 0);
          setSteps(totalSteps);
        }
      });

      // Fetch other data (distance, flights climbed) similarly
      GoogleFit.getDailyDistanceSamples({ startDate, endDate }).then(res => {
        console.log('Daily distance', res);
        if (res.length > 0) {
          const distanceData = res[0].distance;
          const totalDistance = distanceData.reduce((acc, day) => acc + day.value, 0);
          setDistance(totalDistance / 1000); // convert meters to km
        }
      });

      // GoogleFit.getDailyFlightsClimbedSamples({ startDate, endDate }).then(res => {
      //   console.log('Daily flights climbed', res);
      //   if (res.length > 0) {
      //     const flightsData = res[0].flights;
      //     const totalFlights = flightsData.reduce((acc, day) => acc + day.value, 0);
      //     setFlightsClimbed(totalFlights);
      //   }
      // });
    };

  }, []);

  return (
    <View className='w-full items-center h-full justify-center'>
      <RingProgress progress={steps / 10000} />
      <View className='mt-10'>
        <View style={{ gap: 40 }} className='flex-row mb-5'>
          <Value label="Steps" value={steps.toString()} />
          <Value label="Distance" value={`${distance.toFixed(2)} km`} />
        </View>
        <Value label="Flights Climbed" value={flightsClimbed.toString()} />
      </View>
    </View>
  );
};

export default Activity;
