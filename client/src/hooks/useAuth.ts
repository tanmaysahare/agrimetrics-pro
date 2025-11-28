setError(err.message);
        } finally {
    setLoading(false);
}
    };

return { signIn, logout, user, loading, error };
};
