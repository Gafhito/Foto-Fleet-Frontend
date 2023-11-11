import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { EmojiEmotions, SportsSoccer, Work, Restaurant } from '@mui/icons-material';

export const availableIcons = [
  { label: 'Emojis', icon: <EmojiEmotions /> },
  { label: 'Soccer', icon: <SportsSoccer /> },
  { label: 'Work', icon: <Work /> },
  { label: 'Restaurant', icon: <Restaurant /> },
];

export const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryIcon, setCategoryIcon] = useState(null);

  const handleAddCategory = () => {
    if (categoryName.trim() && categoryIcon) {
      onAddCategory({
        name: categoryName,
        icon: categoryIcon.label,
      });
      setCategoryName('');
      setCategoryIcon(null);
    }
  };

  return (
    <Box>
      <TextField
        label="Category Name"
        variant="outlined"
        fullWidth
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        margin="normal"
      />
      <Autocomplete
        options={availableIcons}
        getOptionLabel={(option) => option.label}
        value={categoryIcon}
        onChange={(event, newValue) => setCategoryIcon(newValue)}
        renderInput={(params) => <TextField {...params} label="Category Icon" variant="outlined" fullWidth margin="normal" />}
        renderOption={(props, option) => (
          <li {...props}>
            {option.icon}
            {option.label}
          </li>
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
        fullWidth
      >
        Add Category
      </Button>
    </Box>
  );
};