import { listPNGFiles } from '@/utils';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const ActivityContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
`;

const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 20px;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

const ImagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
`;

const ImageItem = styled.Image`
  width: 45%;
  height: 100px;
  resize-mode: cover;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export function Images() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      const fetchFiles = async () => {
        const PNGFiles = await listPNGFiles()
        if (PNGFiles) {
          setImages(PNGFiles)
        }
        setLoading(false)
      }
      fetchFiles()
    }
  }, [isFocused]);


  if (loading)
    return (
      <ActivityContainer>
        <StyledActivityIndicator size="large" color="#000" />
      </ActivityContainer>
    )
  return (
    <Container>
      <StyledTitle>Gallery</StyledTitle>
      <StyledScrollView>
        <ImagesContainer>
          {images.map((image, index) => (
            <ImageItem key={index} source={{ uri: 'file://' + image }} />
          ))}
        </ImagesContainer>
      </StyledScrollView>
    </Container>
  );
}
