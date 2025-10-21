tata cara untuk menjalankan project ini sebagai berikut :
- versi node js berada di versi v20.x.x keatas
- silakan clone project otomedia di repo yang sudah saya buatkan
- setelah itu npm install terlebih dahulu, sebelum menjalankan project tersebut.
- selanjutnya lanjut menjalankan npx react-native run-android hingga sampai selesai


jika dalam menjalankan terdapat error dibawah ini, silakan mengikuti perintah tersebut
- jika terdapat error di awal seperti react-native-sqlite-storage
> pergi ke node_modules -> react-native-sqlite-storage -> platforms -> android -> pilih build.gradle -> abis itu edit / ganti bagian jcenter menjadi -> mavenCentral()
- setelah semuanya sudah berubah, lanjut gradlew clean terlebih dahulu
- abis itu lanjut menjalankan perintah npx react-native run-android
