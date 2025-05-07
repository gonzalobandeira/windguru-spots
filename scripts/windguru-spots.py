import json
import requests
from typing import Dict, Any
from pathlib import Path

def fetch_region_data(region_id: int) -> Dict[str, Any]:
	"""Fetch data for a specific region."""
	region_req_url = f'http://old.windguru.cz/int/ajax/wg_ajax_json_select.php?q=zeme&id_georegion={region_id}&exist_spots=1&id_model=0'
	response = requests.get(region_req_url)
	response.raise_for_status()
	return response.json()

def fetch_area_spots(area_id: int, region_id: int) -> Dict[str, int]:
	"""Fetch spots for a specific area."""
	area_req_url = f'http://old.windguru.cz/int/ajax/wg_ajax_json_select.php?q=spots&id_zeme={area_id}&id_region=0&id_georegion={region_id}&cats=4'
	response = requests.get(area_req_url)
	response.raise_for_status()
	return response.json()

def main() -> None:
	results: Dict[str, Dict[str, Dict[str, int]]] = {}

	region_ids = {
		'Europe': 150,
		# Uncomment other regions as needed
		# 'Africa': 2,
		# 'Asia': 142,
		# 'Oz & NZ': 53,
		# 'Caribbean': 29,
		# 'Central America': 13,
		# 'North America': 21,
		# 'Oceania': 9,
		# 'South America': 5
	}

	for region_name, region_id in region_ids.items():
		try:
			print(f"\nProcessing Region: {region_name} (ID: {region_id})")
			
			region_data = fetch_region_data(region_id)
			if not region_data or 'zeme' not in region_data:
				print(f"No data found for region {region_name}")
				continue
				
			region_areas = region_data['zeme']
			print(f"Found {len(region_areas)} areas in {region_name}")
			
			area_info: Dict[str, Dict[str, int]] = {}
			areas_processed = 0
			areas_with_spots = 0

			for area_item in region_areas:
				area_id = int(area_item[0])
				area_name = area_item[1]
				areas_processed += 1
				
				print(f"\nProcessing Area: {area_name} (ID: {area_id})")

				try:
					area_data = fetch_area_spots(area_id, region_id)
					area_spots: Dict[str, int] = {}
					
					spots = area_data.get('spots', [])
					print(f"Found {len(spots)} spots in {area_name}")
					
					for spot in spots:
						spot_id = spot[0]
						spot_name = spot[1]
						print(f"  Spot: {spot_name} (ID: {spot_id})")
						area_spots[spot_name] = spot_id

					if area_spots:
						area_info[area_name] = area_spots
						areas_with_spots += 1

				except (requests.RequestException, KeyError, ValueError) as e:
					print(f'Failed to fetch spots for {region_name} - {area_name} ({area_id}): {str(e)}')

			print(f"\nRegion {region_name} summary:")
			print(f"  Areas processed: {areas_processed}")
			print(f"  Areas with spots: {areas_with_spots}")
			print(f"  Areas saved: {len(area_info)}")

			if area_info:
				results[region_name] = area_info
				print(f"Saved {len(area_info)} areas for region {region_name}")

		except (requests.RequestException, KeyError, ValueError) as e:
			print(f'Failed to fetch region {region_name}: {str(e)}')

	print("\nFinal results summary:")
	for region, areas in results.items():
		print(f"Region {region}: {len(areas)} areas")

	# Save results to file
	output_path = Path("windguru_spots.json")
	output_path.write_text(
		json.dumps(results, ensure_ascii=False, sort_keys=True, indent=4),
		encoding='utf-8'
	)

	print('\nDone')

if __name__ == '__main__':
	main()








