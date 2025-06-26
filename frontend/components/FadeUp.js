export function FadeUp({ children }) {
    let ref = useRef(null);
    let isInView = useInView(ref);
    let [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isInView) {
            setIsVisible(true);
        }
    }, [isInView, isVisible]);

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 15
                },
                visible: {
                    opacity: 1,
                    y: 0
                },
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.2, delay: 0.3 }}
        >
            {children}
        </motion.div>
    );
}