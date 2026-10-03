import loadData from './services/api';

export default function App(): React.ReactNode {
  return <main>{loadData()}</main>;
}
