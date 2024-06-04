useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // Тут код
  });
  return unsubscribe;
}, [navigation]);