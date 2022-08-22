import { listCSVFiles } from '@/utils';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

const DataContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
`;

const CardInfo = styled.View`
  width: 45%;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: #fff;
  justify-content: center;
`;

const CardInfoText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: #000;
`;

const CardInfoText2 = styled.Text`
  text-align: center;
  font-size: 15px;
  color: #AAA;
  font-style: italic;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 20px;
`;

const ActivityContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export function Sheets() {
  const [csv, setCSV] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      const fetchFiles = async () => {
        const CSVFiles = await listCSVFiles()
        setCSV(CSVFiles)
        setLoading(false)
        console.log(CSVFiles)
      }
      fetchFiles()
    }
  }, [isFocused]);

  if (loading)
    return (
      <ActivityContainer>
        <StyledActivityIndicator size="large" color="#0000ff" />
      </ActivityContainer>
    )
  return (
    <Container>
      <StyledTitle>Sheets</StyledTitle>
      <StyledScrollView>
        <DataContainer>
          {csv.map((item, index) => (
            <CardInfo key={index}>
              <CardInfoText>Total: {item.total}</CardInfoText>
              <CardInfoText2>{item.name}</CardInfoText2>
            </CardInfo>
          ))}
        </DataContainer>
      </StyledScrollView>
    </Container>
  );
}
