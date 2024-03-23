import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function FileUploader({
  parseHighlights
}) {
  const onDrop = useCallback((acceptedFiles) => {

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = async () => {
        const rawHighlights = reader.result
        await parseHighlights(rawHighlights)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [parseHighlights])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <Paper {...getRootProps()} elevation={3}>
      <Box 
        height={150}
        my={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
        p={2}
      >
        <input {...getInputProps()} />
        <Typography>Drag Clippings.txt here</Typography>
      </Box>
    </Paper>
  )
}

export default FileUploader;

FileUploader.propTypes = {
  parseHighlights: PropTypes.func.isRequired,
};
