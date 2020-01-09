#! /bin/bash
cd android && ./gradlew clean && cd .. && react-native link && npx react-native run-android