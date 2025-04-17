import { createContext, useState } from "react";
import bgBoardImg from "../../assets/pexels-anastasia-shuraeva-7278606.jpg";

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(bgBoardImg);

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider, ImageContext };
