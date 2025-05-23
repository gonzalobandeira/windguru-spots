import json
import requests
from typing import Dict, Any, Tuple, Optional
from pathlib import Path

WINDGURU_SPOTS_PATH = Path("src/data/windguru_spots.json")
WINDGURU_BASE_URL = "http://old.windguru.cz/int/ajax/wg_ajax_json_select.php"
SPOT_DETAILS_URL = "https://www.windguru.cz/int/iapi.php"

def fetch_region_data(region_id: int) -> Dict[str, Any]:
    """Fetch data for a specific region."""
    region_req_url = f'{WINDGURU_BASE_URL}?q=zeme&id_georegion={region_id}&exist_spots=1&id_model=0'
    response = requests.get(region_req_url)
    response.raise_for_status()
    return response.json()

def fetch_area_spots(area_id: int, region_id: int) -> Dict[str, Any]:
    """Fetch spots for a specific area."""
    area_req_url = f'{WINDGURU_BASE_URL}?q=spots&id_zeme={area_id}&id_region=0&id_georegion={region_id}'
    # Remove cats=4 to get all spots as we don't know what this category filter is doing
    # area_req_url = f'http://old.windguru.cz/int/ajax/wg_ajax_json_select.php?q=spots&id_zeme={area_id}&id_region=0&id_georegion={region_id}&cats=4'
    response = requests.get(area_req_url)
    response.raise_for_status()
    return response.json()

def fetch_spot_details(spot_id: str) -> Optional[Tuple[float, float]]:
    """Fetch latitude and longitude for a specific spot."""
    try:
        params = {
            'q': 'station-data',
            'id_spot': spot_id,
            'date_format': 'Y-m-d',
            'tid': 0
        }
        response = requests.get(SPOT_DETAILS_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        # Extract latitude and longitude from the response
        if 'lat' in data and 'lon' in data:
            return float(data['lat']), float(data['lon'])
        return None
    except (requests.RequestException, KeyError, ValueError, json.JSONDecodeError) as e:
        print(f"Error fetching details for spot {spot_id}: {str(e)}")
        return None

def main() -> None:
    # First, load existing data to preserve it
    try:
        existing_data = json.loads(WINDGURU_SPOTS_PATH.read_text(encoding='utf-8'))
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = {}

    results = existing_data.copy()

    # Process only regions that exist in the current data
    for region_name, areas in existing_data.items():
        print(f"\nProcessing Region: {region_name}")
        
        for area_name, spots in areas.items():
            print(f"\nProcessing Area: {area_name}")
            
            # Convert the existing spots format to the new format with coordinates
            updated_spots = {}
            spots_processed = 0
            spots_with_coords = 0
            
            for spot_name, spot_id in spots.items():
                spots_processed += 1
                print(f"  Processing Spot: {spot_name} (ID: {spot_id})")
                
                # Fetch coordinates for the spot
                coords = fetch_spot_details(spot_id)
                
                if coords:
                    lat, lon = coords
                    updated_spots[spot_name] = {
                        "id": spot_id,
                        "lat": lat,
                        "lon": lon
                    }
                    spots_with_coords += 1
                    print(f"    ✓ Got coordinates: {lat}, {lon}")
                else:
                    # Keep the original format if coordinates couldn't be fetched
                    updated_spots[spot_name] = {
                        "id": spot_id
                    }
                    print(f"    ✗ Could not get coordinates")
                
            # Update the results with the new format
            if region_name not in results:
                results[region_name] = {}
            
            results[region_name][area_name] = updated_spots
            
            print(f"  Area summary:")
            print(f"    Spots processed: {spots_processed}")
            print(f"    Spots with coordinates: {spots_with_coords}")

    print("\nFinal results summary:")
    for region, areas in results.items():
        print(f"Region {region}: {len(areas)} areas")

    # Save results to file
    WINDGURU_SPOTS_PATH.write_text(
        json.dumps(results, ensure_ascii=False, sort_keys=True, indent=4),
        encoding='utf-8'
    )

    print('\nDone')

if __name__ == '__main__':
    main()

