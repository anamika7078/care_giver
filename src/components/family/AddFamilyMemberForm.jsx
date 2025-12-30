import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Grid,
    CircularProgress,
    Autocomplete,
    Typography,
    Box
} from '@mui/material';
import { addFamilyMember, searchUsers } from '../../services/api/familyMemberService';

const relationships = [
    'Spouse',
    'Child',
    'Grandchild',
    'Sibling',
    'Niece/Nephew',
    'Friend',
    'Other'
];

const AddFamilyMemberForm = ({ open, onClose, elderId, onSuccess }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (searchQuery.length > 2) {
                try {
                    const data = await searchUsers(searchQuery);
                    setSearchResults(data);
                } catch (error) {
                    enqueueSnackbar(error.message || 'Error searching users', { variant: 'error' });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, enqueueSnackbar]);

    const handleUserSelect = (event, value) => {
        setSelectedUser(value);
    };

    const onSubmit = async (data) => {
        if (!selectedUser) {
            enqueueSnackbar('Please select a user', { variant: 'error' });
            return;
        }

        try {
            setLoading(true);
            const familyMemberData = {
                userId: selectedUser.id,
                elderId,
                relationship: data.relationship,
                permissions: {
                    canViewMedical: data.canViewMedical || false,
                    canEditProfile: data.canEditProfile || false,
                    canBookServices: data.canBookServices || false,
                    isPrimary: data.isPrimary || false
                }
            };

            await addFamilyMember(familyMemberData);
            enqueueSnackbar('Family member added successfully', { variant: 'success' });
            onSuccess();
            handleClose();
        } catch (error) {
            enqueueSnackbar(error.message || 'Failed to add family member', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        setSelectedUser(null);
        setSearchQuery('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Family Member</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={searchResults}
                                getOptionLabel={(option) => `${option.name} (${option.email})`}
                                value={selectedUser}
                                onChange={handleUserSelect}
                                inputValue={searchQuery}
                                onInputChange={(e, value) => setSearchQuery(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search User"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        helperText="Search by name or email"
                                    />
                                )}
                                noOptionsText="No users found. Try a different search term."
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal" error={!!errors.relationship}>
                                <InputLabel id="relationship-label">Relationship</InputLabel>
                                <Select
                                    labelId="relationship-label"
                                    label="Relationship"
                                    {...register('relationship', { required: 'Relationship is required' })}
                                    defaultValue=""
                                >
                                    {relationships.map((rel) => (
                                        <MenuItem key={rel} value={rel}>
                                            {rel}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.relationship && (
                                    <Typography variant="caption" color="error">
                                        {errors.relationship.message}
                                    </Typography>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Box mb={2}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Permissions
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...register('isPrimary')}
                                                    color="primary"
                                                />
                                            }
                                            label="Primary Contact"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...register('canViewMedical')}
                                                    color="primary"
                                                />
                                            }
                                            label="View Medical Info"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...register('canEditProfile')}
                                                    color="primary"
                                                />
                                            }
                                            label="Edit Profile"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...register('canBookServices')}
                                                    color="primary"
                                                />
                                            }
                                            label="Book Services"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading || !selectedUser}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Adding...' : 'Add Family Member'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddFamilyMemberForm;
