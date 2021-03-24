import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

  const { Camera, Filesystem, Storage } = Plugins;
  

@Injectable({
  providedIn: 'root'
})



export class PhotoService {
  
  private async savePicture(cameraPhoto: CameraPhoto) {
 // Convert photo to base64 format, required by Filesystem API to save
 const base64Data = await this.readAsBase64(cameraPhoto);

  // Write the file to the data directory
  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: FilesystemDirectory.Data
  });

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: cameraPhoto.webPath
  };

   }
  public photos: Photo[] = [];
  
  public async addNewToGallery() {

    
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });
  
    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);  
      }
  
    
    
  

  constructor() { }
}
export interface Photo {
  filepath: string;
  webviewPath: string;
}
