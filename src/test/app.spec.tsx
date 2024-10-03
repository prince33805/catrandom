import App from "../App";
import { render, screen, userEvent, waitFor } from "../utils/test.utils";

describe("Test Suit for App", () => {
    it("checking Cat Gallery is available", () => {
        render(<App />);
        const text = screen.getByText("Cat Gallery");
        expect(text).toBeInTheDocument();
    });

    it("checking text is available", () => {
        render(<App />);
        const field = screen.getByTestId("images-number-field");
        expect(field).toBeInTheDocument();
    });

    it("checking random btn is available", () => {
        render(<App />);
        const btn = screen.getByTestId("random-image-btn");
        expect(btn).toBeInTheDocument();
    });

    it("should input text field to 10", async () => {
        render(<App />);
        const inputField = screen.getByTestId("images-number-field");

        await userEvent.type(inputField, "{backspace}10");

        expect(inputField).toHaveValue(10);
    });

    it("random image with 1 image", async () => {
        render(<App />);
        userEvent.click(screen.getByTestId("random-image-btn"));
        expect(await screen.findAllByTestId("image-item")).toHaveLength(1);
    });

    it("random image with 10 image", async () => {
        render(<App />);
        const inputField = screen.getByTestId("images-number-field");
        await userEvent.type(inputField, "{backspace}10");
        userEvent.click(screen.getByTestId("random-image-btn"));
        expect(await screen.findAllByTestId("image-item")).toHaveLength(10);
    });

    it("should show loading indicator when random image is clicked", async () => {
        render(<App />);
        userEvent.click(screen.getByTestId("random-image-btn"));
        await waitFor(() => {
            const loadingIndicator = screen.getByTestId("loading-indicator");
            expect(loadingIndicator).toBeInTheDocument();
        });
    });

    it("should show error when input random image more than 10", async () => {
        render(<App />);
        const inputField = screen.getByTestId("images-number-field");
        await userEvent.type(inputField, "{backspace}11");
        userEvent.click(screen.getByTestId("random-image-btn"));
        await waitFor(() => {
            const loadingIndicator = screen.getByText(
                "Number should be between 1 and 10"
            );
            expect(loadingIndicator).toBeInTheDocument();
        });
    });

    it("should show error when input random image less than 1", async () => {
        render(<App />);
        const inputField = screen.getByTestId("images-number-field");
        await userEvent.type(inputField, "{backspace}0");
        userEvent.click(screen.getByTestId("random-image-btn"));
        await waitFor(() => {
            const loadingIndicator = screen.getByText(
                "Number should be between 1 and 10"
            );
            expect(loadingIndicator).toBeInTheDocument();
        });
    });
});
