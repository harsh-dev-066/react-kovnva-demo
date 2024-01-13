import './App.css';
import { Tab, Tabs } from './components/Tabs/Tabs';
import Cluster from './components/cluster/Cluster';
import Shapes from './components/shapes/Shapes';
import ImageCanvas from './components/image-canvas/ImageCanvas';
import Crop from './components/crop/Crop';

const App = () => {
  return (
      <div className="tabs">
       <Tabs>
         <Tab label="Cluster">
          <Cluster />
         </Tab>
         <Tab label="Shapes">
           <Shapes />
         </Tab>
         <Tab label="Picture">
            <ImageCanvas imageUrl={'https://d38m2t53u71fg7.cloudfront.net/dev/client-data/images/ce1cbcde-b765-566e-ae45-aa9ca8e51d39/projects/be3b4b53-75ea-4944-bd77-5ffc086afde0/2bcc3648-db66-558c-ab4c-f62809db6437.jpeg'} />
         </Tab>
         <Tab label="Crop">
            <Crop imageUrl={'https://d38m2t53u71fg7.cloudfront.net/dev/client-data/images/ce1cbcde-b765-566e-ae45-aa9ca8e51d39/projects/be3b4b53-75ea-4944-bd77-5ffc086afde0/2bcc3648-db66-558c-ab4c-f62809db6437.jpeg'} />
         </Tab>
       </Tabs>
      </div>      
  );
}


export default App;
