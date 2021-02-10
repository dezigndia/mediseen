import React, { Component } from "react"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"

export class ImageUpload extends Component {
	render() {
		return (
			<>
				<input
					style={{ display: "none" }}
					type="file"
					name="gallery"
					ref={(fileInput) => (this.fileInput = fileInput)}
					onChange={(e) => {
						this.props.select(e.target.files[0])
					}}
				/>
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
