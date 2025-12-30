import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from '@mui/material';
import {
    PersonAdd as PersonAddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    MedicalServices as MedicalIcon,
    EditNote as EditNoteIcon,
    BookOnline as BookOnlineIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { getFamilyMembers, updateFamilyMember, removeFamilyMember } from '../../services/api/familyMemberService';
import AddFamilyMemberForm from './AddFamilyMemberForm';

const PermissionChip = ({ icon: Icon, label, hasPermission }) => (
    <Chip
        icon={<Icon fontSize="small" />}
        label={label}
        size="small"
        color={hasPermission ? 'primary' : 'default'}
        variant={hasPermission ? 'filled' : 'outlined'}
        sx={{ mr: 1, mb: 1 }}
    />
);

const FamilyMembersList = ({ elderId }) => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const fetchFamilyMembers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getFamilyMembers(elderId);
            setFamilyMembers(response.data || []);
        } catch (error) {
            enqueueSnackbar(error.message || 'Failed to load family members', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [elderId, enqueueSnackbar]);

    useEffect(() => {
        if (elderId) {
            fetchFamilyMembers();
        }
    }, [elderId, fetchFamilyMembers]);

    const handleDeleteClick = (member) => {
        setMemberToDelete(member);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!memberToDelete) return;

        try {
            await removeFamilyMember(memberToDelete.id);
            enqueueSnackbar('Family member removed successfully', { variant: 'success' });
            fetchFamilyMembers();
        } catch (error) {
            enqueueSnackbar(error.message || 'Failed to remove family member', { variant: 'error' });
        } finally {
            setDeleteDialogOpen(false);
            setMemberToDelete(null);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <Typography>Loading family members...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Family Members</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setAddDialogOpen(true)}
                >
                    Add Family Member
                </Button>
            </Box>

            {familyMembers.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography color="textSecondary">
                        No family members added yet. Click the button above to add one.
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Relationship</TableCell>
                                <TableCell>Permissions</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {familyMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            {member.isPrimary && (
                                                <Tooltip title="Primary Contact">
                                                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                                                </Tooltip>
                                            )}
                                            <span>{member.User?.name || 'N/A'}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{member.User?.email || 'N/A'}</TableCell>
                                    <TableCell>{member.relationship}</TableCell>
                                    <TableCell>
                                        <Box display="flex" flexWrap="wrap">
                                            <PermissionChip
                                                icon={MedicalIcon}
                                                label="Medical"
                                                hasPermission={member.canViewMedical}
                                            />
                                            <PermissionChip
                                                icon={EditNoteIcon}
                                                label="Edit Profile"
                                                hasPermission={member.canEditProfile}
                                            />
                                            <PermissionChip
                                                icon={BookOnlineIcon}
                                                label="Book Services"
                                                hasPermission={member.canBookServices}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Remove Family Member">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteClick(member)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <AddFamilyMemberForm
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                elderId={elderId}
                onSuccess={fetchFamilyMembers}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Remove Family Member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove {memberToDelete?.User?.name} as a family member?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FamilyMembersList;
