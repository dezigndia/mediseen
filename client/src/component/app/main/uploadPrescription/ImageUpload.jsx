import React, { Component } from "react"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"

export class ImageUpload extends Component {
	handleImage = (e) => {
		const reader = new FileReader()
		reader.onload = () => {
			if (reader.readyState === 2) {
				this.props.select(reader.result)
			}
		}
		reader.readAsDataURL(e.target.files[0])
	}

	render() {
		return (
			<>
				<input
					style={{ display: "none" }}
					type="file"
					name="gallery"
					ref={(fileInput) => (this.fileInput = fileInput)}
					onChange={(e) => {
						this.handleImage(e)
					}}
				/>
				 {/* <input type="file" accept="image/*" capture="capture"/> */}
				<PhotoLibraryIcon />
				<h3
					style={{ padding: "0.5rem 0" }}
					onClick={() => this.fileInput.click()}
				>
					Gallery
				</h3>
			</>
		)
	}
}

export default ImageUpload
