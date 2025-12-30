import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant = 'contained', size = 'medium' }) => ({
    textTransform: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    boxShadow: 'none',
    padding: '10px 20px',
    fontSize: '0.9375rem',
    lineHeight: 1.5,
    '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    ...(variant === 'contained' && {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
    }),
    ...(variant === 'outlined' && {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderColor: theme.palette.primary.dark,
        },
    }),
    ...(variant === 'text' && {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
    }),
    ...(size === 'small' && {
        padding: '6px 12px',
        fontSize: '0.8125rem',
    }),
    ...(size === 'large' && {
        padding: '12px 24px',
        fontSize: '1rem',
    }),
}));

const Button = ({
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    loading = false,
    startIcon,
    endIcon,
    fullWidth = false,
    disabled = false,
    ...props
}) => {
    return (
        <StyledButton
            variant={variant}
            color={color}
            size={size}
            disabled={disabled || loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            {...props}
        >
            {!loading && children}
            {loading && !startIcon && !endIcon && 'Loading...'}
        </StyledButton>
    );
};

export default Button;
