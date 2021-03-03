import React from 'react'
import styled from 'styled-components';
import {Container} from 'react-bootstrap'

//style with styled components
const Title = styled.h1`
  color: #047bfe;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: #ebf4fc;
`;

function Home() {
  return (
    <Container>
      {/* styled-components section */}
      <Wrapper>
      {/* styled-components h1 */}
      <Title>Page Home styled with styled-components</Title>
      </Wrapper>
    </Container>
  )
}

export default Home
