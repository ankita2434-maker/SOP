const fileURLToPath = __vite__cjsImport3_url["fileURLToPath"];const express = __vite__cjsImport0_express;const dotenv = __vite__cjsImport1_dotenv;import __vite__cjsImport0_express from "/node_modules/.vite/deps/express.js?v=16aedde6";
import __vite__cjsImport1_dotenv from "/node_modules/.vite/deps/dotenv.js?v=2d4e88c2";
import path from "/@id/__vite-browser-external:path";
import __vite__cjsImport3_url from "/@id/__vite-browser-external:url";
import { processNotesWithGemini } from "/server/geminiService.ts";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function startServer() {
	const app = express();
	const PORT = Number(process.env.PORT) || 3e3;
	app.use(express.json({ limit: "25mb" }));
	// API Route: Passcode Verification
	app.post("/api/verify-passcode", (req, res) => {
		const { passcode } = req.body || {};
		const validPasscode = process.env.SOP_PASSCODE || "ops-auth-8492-team";
		if (passcode && passcode.trim().toLowerCase() === validPasscode.trim().toLowerCase()) {
			return res.json({
				valid: true,
				message: "Access granted"
			});
		}
		return res.status(401).json({
			valid: false,
			error: "Invalid team passcode. Default is \"ops-auth-8492-team\""
		});
	});
	// API Route: Generate SOP
	app.post("/api/generate-sop", async (req, res) => {
		try {
			const apiKey = process.env.GEMINI_API_KEY;
			const result = await processNotesWithGemini(req.body, apiKey);
			if (!result.success) {
				return res.status(400).json(result);
			}
			return res.json(result);
		} catch (err) {
			console.error("API /api/generate-sop error:", err);
			return res.status(500).json({
				success: false,
				error: err?.message || "Internal server error while processing SOP.",
				error_type: "api_error"
			});
		}
	});
	// Vite middleware in dev or static files in production
	if ("development" === "production") {
		app.use(express.static(path.resolve(__dirname, "dist")));
		app.get("*", (req, res) => {
			res.sendFile(path.resolve(__dirname, "dist", "index.html"));
		});
	} else {
		const { createServer: createViteServer } = await import("/node_modules/.vite/deps/vite.js?v=7362e734");
		const vite = await createViteServer({
			server: {
				middlewareMode: true,
				hmr: process.env.DISABLE_HMR !== "true"
			},
			appType: "spa"
		});
		app.use(vite.middlewares);
	}
	app.listen(PORT, "0.0.0.0", () => {
		console.log(`SOP Builder server running at http://0.0.0.0:${PORT}`);
	});
}
startServer().catch((err) => {
	console.error("Failed to start server:", err);
	process.exit(1);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyw4QkFBOEI7QUFFdkMsT0FBTyxPQUFPO0FBRWQsTUFBTSxhQUFhLGNBQWMsWUFBWSxHQUFHO0FBQ2hELE1BQU0sWUFBWSxLQUFLLFFBQVEsVUFBVTtBQUV6QyxlQUFlLGNBQWM7Q0FDM0IsTUFBTSxNQUFNLFFBQVE7Q0FDcEIsTUFBTSxPQUFPLE9BQU8sUUFBUSxJQUFJLElBQUksS0FBSztDQUV6QyxJQUFJLElBQUksUUFBUSxLQUFLLEVBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQzs7Q0FHdkMsSUFBSSxLQUFLLHlCQUF5QixLQUFLLFFBQVE7RUFDN0MsTUFBTSxFQUFFLGFBQWEsSUFBSSxRQUFRLENBQUM7RUFDbEMsTUFBTSxnQkFBZ0IsUUFBUSxJQUFJLGdCQUFnQjtFQUVsRCxJQUFJLFlBQVksU0FBUyxLQUFLLENBQUMsQ0FBQyxZQUFZLE1BQU0sY0FBYyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUc7R0FDcEYsT0FBTyxJQUFJLEtBQUs7SUFBRSxPQUFPO0lBQU0sU0FBUztHQUFpQixDQUFDO0VBQzVEO0VBQ0EsT0FBTyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSztHQUMxQixPQUFPO0dBQ1AsT0FBTztFQUNULENBQUM7Q0FDSCxDQUFDOztDQUdELElBQUksS0FBSyxxQkFBcUIsT0FBTyxLQUFLLFFBQVE7RUFDaEQsSUFBSTtHQUNGLE1BQU0sU0FBUyxRQUFRLElBQUk7R0FDM0IsTUFBTSxTQUFTLE1BQU0sdUJBQXVCLElBQUksTUFBTSxNQUFNO0dBQzVELElBQUksQ0FBQyxPQUFPLFNBQVM7SUFDbkIsT0FBTyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxNQUFNO0dBQ3BDO0dBQ0EsT0FBTyxJQUFJLEtBQUssTUFBTTtFQUN4QixTQUFTLEtBQVU7R0FDakIsUUFBUSxNQUFNLGdDQUFnQyxHQUFHO0dBQ2pELE9BQU8sSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUs7SUFDMUIsU0FBUztJQUNULE9BQU8sS0FBSyxXQUFXO0lBQ3ZCLFlBQVk7R0FDZCxDQUFDO0VBQ0g7Q0FDRixDQUFDOztDQUdELHNCQUE2QixjQUFjO0VBQ3pDLElBQUksSUFBSSxRQUFRLE9BQU8sS0FBSyxRQUFRLFdBQVcsTUFBTSxDQUFDLENBQUM7RUFDdkQsSUFBSSxJQUFJLE1BQU0sS0FBSyxRQUFRO0dBQ3pCLElBQUksU0FBUyxLQUFLLFFBQVEsV0FBVyxRQUFRLFlBQVksQ0FBQztFQUM1RCxDQUFDO0NBQ0gsT0FBTztFQUNMLE1BQU0sRUFBRSxjQUFjLHFCQUFxQixNQUFNLE9BQU87RUFDeEQsTUFBTSxPQUFPLE1BQU0saUJBQWlCO0dBQ2xDLFFBQVE7SUFDTixnQkFBZ0I7SUFDaEIsS0FBSyxRQUFRLElBQUksZ0JBQWdCO0dBQ25DO0dBQ0EsU0FBUztFQUNYLENBQUM7RUFDRCxJQUFJLElBQUksS0FBSyxXQUFXO0NBQzFCO0NBRUEsSUFBSSxPQUFPLE1BQU0saUJBQWlCO0VBQ2hDLFFBQVEsSUFBSSxnREFBZ0QsTUFBTTtDQUNwRSxDQUFDO0FBQ0g7QUFFQSxZQUFZLENBQUMsQ0FBQyxPQUFPLFFBQVE7Q0FDM0IsUUFBUSxNQUFNLDJCQUEyQixHQUFHO0NBQzVDLFFBQVEsS0FBSyxDQUFDO0FBQ2hCLENBQUMiLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbInNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgeyBwcm9jZXNzTm90ZXNXaXRoR2VtaW5pIH0gZnJvbSAnLi9zZXJ2ZXIvZ2VtaW5pU2VydmljZS5qcyc7XG5cbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRTZXJ2ZXIoKSB7XG4gIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgY29uc3QgUE9SVCA9IE51bWJlcihwcm9jZXNzLmVudi5QT1JUKSB8fCAzMDAwO1xuXG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKHsgbGltaXQ6ICcyNW1iJyB9KSk7XG5cbiAgLy8gQVBJIFJvdXRlOiBQYXNzY29kZSBWZXJpZmljYXRpb25cbiAgYXBwLnBvc3QoJy9hcGkvdmVyaWZ5LXBhc3Njb2RlJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBwYXNzY29kZSB9ID0gcmVxLmJvZHkgfHwge307XG4gICAgY29uc3QgdmFsaWRQYXNzY29kZSA9IHByb2Nlc3MuZW52LlNPUF9QQVNTQ09ERSB8fCAnb3BzLWF1dGgtODQ5Mi10ZWFtJztcblxuICAgIGlmIChwYXNzY29kZSAmJiBwYXNzY29kZS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gdmFsaWRQYXNzY29kZS50cmltKCkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKHsgdmFsaWQ6IHRydWUsIG1lc3NhZ2U6ICdBY2Nlc3MgZ3JhbnRlZCcgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XG4gICAgICB2YWxpZDogZmFsc2UsXG4gICAgICBlcnJvcjogJ0ludmFsaWQgdGVhbSBwYXNzY29kZS4gRGVmYXVsdCBpcyBcIm9wcy1hdXRoLTg0OTItdGVhbVwiJyxcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQVBJIFJvdXRlOiBHZW5lcmF0ZSBTT1BcbiAgYXBwLnBvc3QoJy9hcGkvZ2VuZXJhdGUtc29wJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJvY2Vzc05vdGVzV2l0aEdlbWluaShyZXEuYm9keSwgYXBpS2V5KTtcbiAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLmpzb24ocmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignQVBJIC9hcGkvZ2VuZXJhdGUtc29wIGVycm9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGVycj8ubWVzc2FnZSB8fCAnSW50ZXJuYWwgc2VydmVyIGVycm9yIHdoaWxlIHByb2Nlc3NpbmcgU09QLicsXG4gICAgICAgIGVycm9yX3R5cGU6ICdhcGlfZXJyb3InLFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBWaXRlIG1pZGRsZXdhcmUgaW4gZGV2IG9yIHN0YXRpYyBmaWxlcyBpbiBwcm9kdWN0aW9uXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpKSk7XG4gICAgYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgICAgcmVzLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0JywgJ2luZGV4Lmh0bWwnKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgeyBjcmVhdGVTZXJ2ZXI6IGNyZWF0ZVZpdGVTZXJ2ZXIgfSA9IGF3YWl0IGltcG9ydCgndml0ZScpO1xuICAgIGNvbnN0IHZpdGUgPSBhd2FpdCBjcmVhdGVWaXRlU2VydmVyKHtcbiAgICAgIHNlcnZlcjoge1xuICAgICAgICBtaWRkbGV3YXJlTW9kZTogdHJ1ZSxcbiAgICAgICAgaG1yOiBwcm9jZXNzLmVudi5ESVNBQkxFX0hNUiAhPT0gJ3RydWUnLFxuICAgICAgfSxcbiAgICAgIGFwcFR5cGU6ICdzcGEnLFxuICAgIH0pO1xuICAgIGFwcC51c2Uodml0ZS5taWRkbGV3YXJlcyk7XG4gIH1cblxuICBhcHAubGlzdGVuKFBPUlQsICcwLjAuMC4wJywgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBTT1AgQnVpbGRlciBzZXJ2ZXIgcnVubmluZyBhdCBodHRwOi8vMC4wLjAuMDoke1BPUlR9YCk7XG4gIH0pO1xufVxuXG5zdGFydFNlcnZlcigpLmNhdGNoKChlcnIpID0+IHtcbiAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHN0YXJ0IHNlcnZlcjonLCBlcnIpO1xuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdLCJmaWxlIjoiL2FwcC9hcHBsZXQvc2VydmVyLnRzIn0=