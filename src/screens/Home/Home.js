import { processFile } from '@/utils';
import React from 'react';
import { Button, View, Platform } from 'react-native';
import DocumentPicker, { isInProgress } from 'react-native-document-picker'
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export function Home() {

  const handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('Cancelled')
    } else if (isInProgress(err)) {
      console.warn('Multiple pickers were opened, only the last will be considered')
    } else {
      console.log('Error', err)
      throw err
    }
  }

  return (
    <Container>
      <Button
        title="Upload file ( .csv or .png )"
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'documentDirectory',
              type: Platform.select({
                android: ['image/png', 'text/comma-separated-values'],
                ios: ['public.png', 'public.comma-separated-values-text'],
              }),
            })
            await processFile(pickerResult)
          } catch (e) {
            handleError(e)
          }
        }}
      />
    </Container>
  );
}
