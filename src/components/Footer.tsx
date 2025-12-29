
const Footer = () => {
    return (
        <footer className="w-full border-t bg-background py-6 mt-auto">
            <div className="w-full max-w-6xl px-6 mx-auto flex justify-center text-center">
                <p className="text-sm text-muted-foreground">
                    Created by{" "}
                    <a
                        href="https://www.januantara.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium hover:underline hover:text-primary transition-colors"
                    >
                        Januantara
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
