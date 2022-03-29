import React, { FC } from 'react';
import AppRouter from './routes/AppRouter';
import { Layout } from 'antd';
import { Container } from './styled-сomponents';
import Header from './components/header/Header';

const App: FC = () => {
	return (
		<Layout>
			<Header/>
			<Container>
				<AppRouter/>
			</Container>
		</Layout>
	);
};

export default App;
