export function convertBase64ToFile(base64Img: string) {
  // Replace the following with your actual Base64-encoded string
  var base64String = base64Img

  // Extract the content type and data from the Base64 string
  var contentType = base64String.match(/^data:(.*?);/)[1]
  var base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')

  // Convert the Base64 data to a binary blob
  var binaryData = atob(base64Data)

  // Create a Uint8Array from the binary data
  var uint8Array = new Uint8Array(binaryData.length)
  for (var i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i)
  }

  // Create a Blob from the Uint8Array
  var blob = new Blob([uint8Array], { type: contentType })

  // Create a File from the Blob
  var file = new File([blob], 'thumbnail', { type: contentType })
  return file
}
