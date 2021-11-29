import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Top from './components/Top'
import useClientSize from './hooks/useClientSize'
import { Detail, Main, Splash } from './pages'
import { useState } from 'react'
import Bottom from './components/Bottom'

function App() {
	const clientSize = useClientSize()
	const isPc = clientSize?.width > 500;
	const [isSplash, setIsSplash] = useState(window.location.pathname === '/')

	return (
		<BrowserRouter>
			<Container isPc={isPc}>
				<Wrap clientSize={clientSize} isPc={isPc}>
					<Routes>
						<Route path="/main" element={ 
							<>
								<Top />
								<Main />
							</> 
						} />
						<Route path="/:category" element={ 
							<>
								<Detail />
								<Bottom />
							</>  
						} />
						<Route exact path="/" element={ <Splash /> } />
						
					</Routes>
				</Wrap>
			</Container>
		</BrowserRouter>
	)
}

export default App;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const Wrap = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	min-width: ${({isPc, clientSize}) => isPc ? '420px' : `${clientSize?.width}px`};
	max-width: ${({isPc, clientSize}) => isPc ? '420px' : `${clientSize?.width}px`};
	min-height: ${({clientSize}) => `${clientSize?.height}px`};
	border-left: ${({isPc}) => isPc ? '1px solid var(--borderColor)' : null};
	border-right: ${({isPc}) => isPc ? '1px solid var(--borderColor)' : null};
`