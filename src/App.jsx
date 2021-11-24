import styled from 'styled-components'
import NavBar from './components/NavBar';
import Top from './components/Top';
import useClientSize from './hooks/useClientSize';

function App() {
	const clientSize = useClientSize()

	return (
		<Wrap clientSize={clientSize}>
			<Top />
			<NavBar />
		</Wrap>
	)
}

export default App;

const Wrap = styled.div`
	width: ${p => `${p.clientSize?.width}px`};
	height: ${p => `${p.clientSize?.height}px`};
`